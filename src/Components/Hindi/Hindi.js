import React, { useState, useEffect } from 'react';
import '../Mathematics/Maths.css'; // Reusing same CSS
import HindiData from './HindiData.json';

export default function Hindi() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { img: "./images/Hindi-slide1.png", content: "Content for Slide 1" },
    { img: "./images/Hindi-slide2.png", content: "Content for Slide 2" },
    { img: "./images/Hindi-slide3.png", content: "Content for Slide 3" }
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  const [completedChapters, setCompletedChapters] = useState(() => {
    return JSON.parse(localStorage.getItem('completedHindiChapters')) || {};
  });

  useEffect(() => {
    localStorage.setItem('completedHindiChapters', JSON.stringify(completedChapters));
  }, [completedChapters]);

  const toggleChapterCompletion = (chapterId) => {
    setCompletedChapters((prev) => {
      const updated = { ...prev, [chapterId]: !prev[chapterId] };
      return updated;
    });
  };

  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const progressPercentage = (completedCount / HindiData.length) * 100;

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
      {/* Blueprint Section */}
      <div className="container-blueprint">
        <div className="card-blueprint blueprint-popup"> 
          <img src="./images/mpboard.png" alt="MP Board" />
          <div className="card-blueprint-content">
            <a href='https://www.mpbse.nic.in/MARKING%20SCHEME_2024_25.pdf'><h2>MP BOARD BLUEPRINT</h2></a>
            <p>Hindi Blueprint</p>
          </div>
        </div>
        <div className="card-blueprint">
          <img src="./images/cbscboard.png" alt="CBSE Board" />
          <div className="card-blueprint-content">
            <a href='https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Hindi_SrSec_2024-25.pdf'><h2>CBSE BOARD BLUEPRINT</h2></a>
            <p>Hindi Blueprint</p>
          </div>
        </div>
      </div>

      {/* Instructions Slider */}
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

      {/* Hindi Table */}
      <div className="table-container">
        <h2>HINDI</h2>
        <table>
          <thead>
            <tr>
              <th>
                <div className="progress-container">
                  <label>Progress: {Math.round(progressPercentage)}%</label>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <p style={{ marginTop: "20px" }}>{completedCount}/{HindiData.length} chapters completed</p>
                </div>
              </th>
              <th>S no.</th>
              <th>Chapters</th>
              <th className="blueprint-num">अध्याय</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {HindiData.map((chapter) => (
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
                <td onClick={() => openPopup(chapter)}>{chapter.id}</td>
                <td onClick={() => openPopup(chapter)}>{chapter.name}</td>
                <td onClick={() => openPopup(chapter)} className="blueprint-num">{chapter.Hname}</td>
                <td onClick={() => openPopup(chapter)} className="delete-icon"></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>Total</td>
              <td></td>
              <td className="table-Total">{/* total count here, e.g. HindiData.length or fixed */}</td>
              <td className="delete-icon"></td>
            </tr>
          </tbody>
        </table>

        {selectedChapter && (
          <div className={`popup-container ${selectedChapter ? 'open' : ''}`}>
            <div className="overlay open" onClick={closePopup}></div>
            <div className="popup open" style={{ border: '2px solid' }}>
              <div className="popup-header">
                <h2>Hindi</h2>
                <button className="popup-close" onClick={closePopup}>&times;</button>
              </div>
              <div className="popup-body">
                <table>
                  <tbody>
                    <tr><th>S no.</th><td>{selectedChapter.id}</td><td>{selectedChapter.id}</td></tr>
                    <tr><th>Chapter Name</th><td>{selectedChapter.name}</td><td>{selectedChapter.Hname}</td></tr>
                    <tr>
                      <th>NCERT BOOK</th>
                      <td><a href={selectedChapter.ncertLink} target="_blank" rel="noopener noreferrer">{selectedChapter.name}</a></td>
                      <td><a href={selectedChapter.HncertLink} target="_blank" rel="noopener noreferrer">{selectedChapter.Hname}</a></td>
                    </tr>
                    <tr>
                      <th>Chapter Solutions</th>
                      <td className='chapterLinks'>
                        <a className='C-links' href={selectedChapter.chapterLinks.chapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br />
                        <a className='C-links' href={selectedChapter.chapterLinks.chapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br />
                        <a className='C-links' href={selectedChapter.chapterLinks.chapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br />
                      </td>
                      <td className='chapterLinks'>
                        <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br />
                      </td>
                    </tr>
                    <tr>
                      <th>YouTube Links</th>
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
                        {selectedChapter.HyoutubeLinks.HyoutubeLinks1 && (
                          <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
                        )}
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
