import React from 'react';

const testimonials = [
  { id: 1, name: 'Felix Brandon', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
  { id: 2, name: 'Abraham Landon', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
  { id: 3, name: 'Rebecca Sylvester', text: 'Lurex made my car rental experience incredibly smooth and hassle-free.' },
];

const Clients: React.FC = () => {
  return (
    <section className="py-20 bg-yellow-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Clients Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(client => (
            <div key={client.id} className="bg-white p-6 rounded-md shadow-md">
              <p className="text-lg mb-4">{client.text}</p>
              <div className="text-yellow-500 text-4xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="font-bold">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
