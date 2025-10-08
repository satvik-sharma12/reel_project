import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/theme.css";
import "../../styles/reels.css";
import axios from 'axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3009/api/food", { withCredentials: true })
      .then(response => {
        console.log(response.data)
        setVideos(response.data.fooditem || []);
      })
      .catch(() => setVideos([]));
  }, []);

  const setVideoRef = (id) => (el) => {
    if (!el) videoRefs.current.delete(id);
    else videoRefs.current.set(id, el);
  };

  // ✅ Function to handle saving food
  
    async function likeVideo(item) {

        const response = await axios.post("http://localhost:3009/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await axios.post("http://localhost:3009/api/food/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

  return (
    <div ref={containerRef} className='reels-page'>
      <div className='reels-feed' role="list">
        {videos.length === 0 && <div className="empty-state">No reels available</div>}
        {videos.map((item) => (
          <section key={item._id} className='reel' role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className='reel-video'
              src={item.video}
              muted
              loop
              preload='metadata'
              autoPlay
            />

            {/* right-side vertical actions */}
            <div className="reel-actions" aria-hidden="false">
              <div className="reel-action-group" aria-hidden="false">
                <button className="reel-action" aria-label="Like" onClick={() => likeVideo(item)}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                    <path d="M12 21s-7.5-4.5-9-7.5S4.5 6 9 6c1.8 0 3.1 1.1 3 3 .1-1.9 1.2-3 3-3 4.5 0 6.5 7.5 6 7.5s-9 7.5-9 7.5z" />
                  </svg>
                </button>
                <div className="reel-action__count">{item.likeCount ?? item.likes ?? 0}</div>
              </div>

              {/* ✅ Save Button (Now Working) */}
              <div className="reel-action-group" aria-hidden="false">
                <button
                  className="reel-action"
                  aria-label="Save"
                  onClick={() => saveVideo(item)} // ✅ added onClick handler
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
                    <path d="M6 2h12v18l-6-3-6 3V2z" />
                  </svg>
                </button>
                <div className="reel-action__count">{item.savesCount ?? item.bookmarks ?? item.saves ?? 0}</div>
              </div>

              <div className="reel-action-group" aria-hidden="false">
                <button className="reel-action" aria-label="Comments">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <div className="reel-action__count">{(item.comments && item.comments.length) ?? 0}</div>
              </div>
            </div>

            <div className='reel-overlay'>
              <div className='reel-content'>
                <p className='reel-desc' title={item.description}>{item.description}</p>
                <Link className="reel-btn" to={`/food-partner/${item.foodPartner}`} aria-label='Visit Store'>
                  Visit store
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* bottom navigation */}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <Link to="/" className="nav-item" aria-current="page">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"/></svg>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/saved" className="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2h12v18l-6-3-6 3V2z" /></svg>
          <span className="nav-label">Saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
