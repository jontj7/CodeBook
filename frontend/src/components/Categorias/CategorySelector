// frontend/src/components/categories/CategorySelector.jsx
import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/apiService';

const CategorySelector = ({ onSelectFilter }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'popular', or category.id

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (err) {
        setError("Error al cargar las categorías.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterClick = (filterType, categoryId = null) => {
    setActiveFilter(filterType);
    onSelectFilter(filterType, categoryId);
  };

  if (loading) return <p>Cargando filtros...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
      <button
        style={{ padding: '10px 20px', borderRadius: '20px', border: activeFilter === 'all' ? '1px solid #007bff' : '1px solid #ccc', backgroundColor: activeFilter === 'all' ? '#e7f3ff' : 'white', cursor: 'pointer' }}
        onClick={() => handleFilterClick('all')}
      >
        Todos los libros
      </button>
      <button
        style={{ padding: '10px 20px', borderRadius: '20px', border: activeFilter === 'popular' ? '1px solid #007bff' : '1px solid #ccc', backgroundColor: activeFilter === 'popular' ? '#e7f3ff' : 'white', cursor: 'pointer' }}
        onClick={() => handleFilterClick('popular')}
      >
        Lecturas más populares
      </button>
      {/* Puedes añadir las categorías aquí como filtros también si quieres */}
      {categories.map(cat => (
        <button
          key={cat.id}
          style={{ padding: '10px 20px', borderRadius: '20px', border: activeFilter === cat.id ? '1px solid #007bff' : '1px solid #ccc', backgroundColor: activeFilter === cat.id ? '#e7f3ff' : 'white', cursor: 'pointer' }}
          onClick={() => handleFilterClick(cat.id, cat.id)}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;