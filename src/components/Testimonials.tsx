import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    { id: 1, name: 'Felix Brandon', image: 'https://i.pinimg.com/474x/7e/35/3f/7e353fb5f0e662d5d6c55cd9302d366d.jpg', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
    { id: 2, name: 'Abraham Landon', image: 'https://i.pinimg.com/736x/77/34/3a/77343a51e4cd2aae772add1f558bd17e.jpg', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
    { id: 3, name: 'Rebecca Sylvester', image: 'https://i.pinimg.com/236x/2f/95/2c/2f952cb3710f4895efcc5f5f3c18b56b.jpg', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
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
