import React, { useState, useEffect } from 'react';
import './Maths.css'; 
import mathsData from './MathData.json'; 

export default function Maths() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

   // ============ slider start =============
   const slides = [
    { img: "./images/Maths-slide1.png", content: "Content for Slide 1" },
    { img: "./images/Maths-slide2.png", content: "Content for Slide 2" },
    { img: "./images/Maths-slide3.png", content: "Content for Slide 3" }
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);
  // progresss
  const [completedChapters, setCompletedChapters] = useState(() => {
    return JSON.parse(localStorage.getItem('completedMathsChapters')) || {};
  });


  useEffect(() => {
    localStorage.setItem('completedMathsChapters', JSON.stringify(completedChapters));
  }, [completedChapters]);

  const toggleChapterCompletion = (chapterId) => {
    setCompletedChapters((prev) => {
      const updated = { ...prev, [chapterId]: !prev[chapterId] };
      return updated;
    });
  };

  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const progressPercentage = (completedCount / mathsData.length) * 100;

  const openPopup = (chapter) => {
    setSelectedChapter(chapter);
  };

  const closePopup = () => {
    setSelectedChapter(null);
  };
  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
     

      {/* slider and Blueprint start */}
          {/* ========== maths blueprint start =============== */}
      <div className="container-blueprint">
        <div className="card-blueprint blueprint-popup"> 
          <img src="./images/mpboard.png" alt="Image 1" />
          <div className="card-blueprint-content">
            <a href='https://www.mpbse.nic.in/MARKING%20SCHEME_2024_25.pdf'><h2>MP BOARD BLUEPRINT</h2></a>
            <p>Maths Blueprint</p>
            
          </div>
        </div>
        <div className="card-blueprint">
          <img src="./images/cbscboard.png" alt="Image 2" />
          <div className="card-blueprint-content">
            <a href='https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Maths_SrSec_2024-25.pdf'><h2>CBSE BOARD BLUEPRINT</h2></a>
            <p>Maths Blueprint</p>
          </div>
        </div>
        
      </div>
      {/* ========== maths blueprint end =============== */}

      {/* ========== maths slider start =============== */}
      <div className="instruct-slider">
        <h1>Instructions</h1>
        <div className="slides" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img className="slider-images" src={slide.img} alt={`Slide ${index + 1}`} />
              <br />
              {slide.content}
            </div>
          ))}
        </div>
        <div className="navigation-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => showSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      {/* ========== maths slider end =============== */}
         {/* slider and Blueprint end */}
      


       {/* Progress Tracker */}
       {/* <div className="progress-container">
  
        <label>Progress: {Math.round(progressPercentage)}%</label>
        
        <div className="progress-bar">
      
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
         
        </div>
        <p className='' style={{marginTop:"20px"}}>{completedCount}/{mathsData.length} chapters completed</p>

      </div> */}
   
      {/* progress tracker End */}
      {/* Maths Table */}
      <div className="table-container">
        <h2>MATHEMATICS</h2>
        <table>
          <thead>
            <tr>
              <th>
                {/* {/* Progress racker */}
                <div className="progress-container"> 
  
  <label>Progress: {Math.round(progressPercentage)}%</label>
  
  <div className="progress-bar">

    <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
   
  </div>
  <p className='' style={{marginTop:"20px"}}>{completedCount}/{mathsData.length} chapters completed</p>

</div>
{/* Progress tracker end */}
</th>
              <th>S no.</th>
              <th>Chapters</th>
              <th className="blueprint-num">अध्याय</th>
              {/* <th></th> */}
              <th></th>
            </tr>

          </thead>
          <tbody>
            {mathsData.map((chapter) => (
              <tr key={chapter.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={!!completedChapters[chapter.id]} 
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleChapterCompletion(chapter.id);
                    }}
                  />
                </td>
                <td  onClick={() => openPopup(chapter)}>{chapter.id}</td>
                <td  onClick={() => openPopup(chapter)}>{chapter.name}</td>
                <td  onClick={() => openPopup(chapter)} className="blueprint-num">{chapter.Hname}</td>
                <td  onClick={() => openPopup(chapter)} className="delete-icon"></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>Total</td>
              <td></td>
              <td className="table-Total">80</td>
              <td className="delete-icon"></td>
            </tr>
          </tbody>
        </table>
        {selectedChapter && (
        <div className={`popup-container ${selectedChapter ? 'open' : ''}`}>
          <div className="overlay open" onClick={closePopup}></div>
          <div className="popup open" style={{border:'2px solid'}}>
            <div className="popup-header">
              <h2>Maths</h2>
              <button className="popup-close" onClick={closePopup}>&times;</button>
            </div>
            <div className="popup-body">
              <table>
                <tbody>
                  
                <tr><th>S no.</th><td>{selectedChapter.id}</td><td>{selectedChapter.id}</td></tr>
                  <tr><th>Chapter Name</th><td>{selectedChapter.name}</td><td>{selectedChapter.Hname}</td></tr>
                  <tr><th>NCERT BOOK</th>
                  
                    <td><a href={selectedChapter.ncertLink} target="_blank" rel="noopener noreferrer">{selectedChapter.name}</a></td><td><a href={selectedChapter.HncertLink} target="_blank" rel="noopener noreferrer">{selectedChapter.Hname}</a></td>
                  </tr>
                  <tr><th>Chapter Solutions</th>
                     <td className='chapterLinks'>
                  
                      <a className='C-links' href={selectedChapter.chapterLinks.chapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br/>
                      <a className='C-links' href={selectedChapter.chapterLinks.chapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br/>
                      <a className='C-links' href={selectedChapter.chapterLinks.chapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br/>

                    </td>
                    <td className='chapterLinks'>
                  
                      <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br/>
                      {/* <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br/>
                      <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br/> */}

                    </td> 
                  </tr>
                  <tr><th>YouTube Links</th>
                    <td className='youtubeLinks'>
                    
                {selectedChapter.youtubeLinks.youtubeLinks1 && (
                        <a className='C-links' href={selectedChapter.youtubeLinks.youtubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
                      )}
                      {selectedChapter.youtubeLinks.youtubeLinks2 && (
                        <a className='C-links' href={selectedChapter.youtubeLinks.youtubeLinks2} target="_blank" rel="noopener noreferrer">YouTube Solution 2</a>
                      )}
                      {selectedChapter.youtubeLinks.youtubeLinks3 && (
                        <a className='C-links' href={selectedChapter.youtubeLinks.youtubeLinks3} target="_blank" rel="noopener noreferrer">YouTube Solution 3</a>
                      )}

                     
                    </td>
                    <td className='youtubeLinks'>
                    
                {selectedChapter.youtubeLinks.youtubeLinks1 && (
                        <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
                      )}
                      {/* {selectedChapter.youtubeLinks.youtubeLinks2 && (
                        <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks2} target="_blank" rel="noopener noreferrer">YouTube Solution 2</a>
                      )} */}
                      {/* {selectedChapter.youtubeLinks.youtubeLinks3 && (
                        <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks3} target="_blank" rel="noopener noreferrer">YouTube Solution 3</a>
                      )} */}

                     
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
