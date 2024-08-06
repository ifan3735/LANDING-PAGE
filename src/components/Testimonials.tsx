import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    { id: 1, name: 'Felix Brandon', image: '/images/user1.png', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
    { id: 2, name: 'Abraham Landon', image: '/images/user2.png', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
    { id: 3, name: 'Rebecca Sylvester', image: '/images/user3.png', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
  ];

  return (
    <section className="p-8 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-8">What Our Clients Are Saying</h2>
      <div className="flex justify-center space-x-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border p-4 rounded-lg text-center w-1/3">
            <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <p className="text-lg italic mb-2">{testimonial.text}</p>
            <p className="font-bold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
