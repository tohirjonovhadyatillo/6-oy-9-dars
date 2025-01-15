import React, { useRef, useState, useEffect } from 'react';

function App() {
  const [formErrors, setFormErrors] = useState({ name: '', email: '' });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const cardRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      name: nameRef.current?.value ? '' : 'Ism kiritish majburiy',
      email: emailRef.current?.value ? '' : 'Email kiritish majburiy'
    };
    setFormErrors(errors);

    if (!errors.name && !errors.email) {
      console.log({
        name: nameRef.current?.value,
        email: emailRef.current?.value
      });
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const addProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const resetProgress = () => {
    setProgress(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    cardRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.add(
          'opacity-0',
          'translate-y-10',
          'scale-95',
          'transition-all',
          'duration-700',
          'ease-out'
        );
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const images = [
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop'
  ];

  return (
    <div className="p-4 space-y-8">
      <div ref={cardRefs[0]} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl mb-4">Forma Validatsiyasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={nameRef}
              type="text"
              placeholder="Ismingiz"
              className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : ''}`}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : ''}`}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Yuborish
          </button>
        </form>
      </div>

      <div ref={cardRefs[1]} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl mb-4">Slideshow</h2>
        <div className="relative">
          <img
            src={images[currentImage]}
            alt="slideshow"
            className="w-full h-48 object-cover rounded"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={prevImage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Oldingi
            </button>
            <button
              onClick={nextImage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Keyingi
            </button>
          </div>
        </div>
      </div>

      <div ref={cardRefs[2]} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl mb-4">Modal</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Modalni ochish
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg mb-4">Modal oyna</h3>
              <p>Bu modal oyna matni</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>

      <div ref={cardRefs[3]} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl mb-4">Progress Bar</h2>
        <div className="w-full bg-gray-200 rounded h-4 mb-4">
          <div
            className="bg-blue-500 h-4 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={addProgress}
            disabled={progress >= 100}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Progress qo'shish
          </button>
          <button
            onClick={resetProgress}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
