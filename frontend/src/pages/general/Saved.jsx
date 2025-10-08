import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/reels.css'

const Saved = () => {
  const [videos, setVideos] = useState([])
  const videoRefs = useRef(new Map())
  const navigate = useNavigate()

  // Fetch saved videos
  useEffect(() => {
    const fetchSavedFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/food/save", { withCredentials: true })
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }))
        setVideos(savedFoods)
      } catch (error) {
        console.error("Failed to fetch saved videos:", error)
      }
    }

    fetchSavedFoods()
  }, [])

  // Remove or un-save a video
  const removeSaved = async (item) => {
    try {
      await axios.post(
        "http://localhost:3009/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      )
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      )
    } catch (error) {
      console.error("Failed to remove saved video:", error)
    }
  }

  // Auto-play videos when mostly in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [videos])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="reels-page saved-page">
      {/* Back to Home Header - improved layout */}
      <div className="saved-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="back-home-btn"
          onClick={() => navigate('/')}
          aria-label="Back to home"
          title="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <h2 style={{ margin: 0, textAlign: 'center', flex: 1, fontSize: '1.05rem' }}>Saved Videos</h2>

        {/* spacer to balance the header so the title remains centered */}
        <div style={{ width: 44 }} aria-hidden="true" />
      </div>

      <div className="reels-feed" role="list">
        {videos.length === 0 && (
          <div className="empty-state">
            <p>No saved videos yet.</p>
          </div>
        )}

        {videos.map((item) => (
          <section key={item._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />
              <div className="reel-actions">
                <div className="reel-action-group">
                  <button className="reel-action" aria-label="Like">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">{item.likeCount ?? 0}</div>
                </div>

                <div className="reel-action-group">
                  <button
                    className="reel-action"
                    onClick={() => removeSaved(item)}
                    aria-label="Bookmark"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">{item.savesCount ?? 0}</div>
                </div>

                <div className="reel-action-group">
                  <button className="reel-action" aria-label="Comments">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">{item.commentsCount ?? 0}</div>
                </div>
              </div>

              <div className="reel-content">
                <p className="reel-description" title={item.description}>{item.description}</p>
                {item.foodPartner && (
                  <Link className="reel-btn" to={"/food-partner/" + item.foodPartner} aria-label="Visit store">Visit store</Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Saved
