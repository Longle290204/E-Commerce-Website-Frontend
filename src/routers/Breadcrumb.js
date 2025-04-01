import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Breadcrumb({ type }) {
   const { slug } = useParams(); // Lấy slug từ URL
   console.log('slug', slug);

   const [breadcrumbs, setBreadcrumbs] = useState([]);

   useEffect(() => {
      axios
         .get(`http://localhost:3002/breadcrumb?slug=${slug}&type=${type}`)
         .then((res) => setBreadcrumbs(res.data))
         .catch((err) => console.error(err));
   }, [slug]);

   return (
      <nav className="text-2xl mr-auto mt-8 mb-6">
         {breadcrumbs.map((item, index) => {
            // const url = '/' + paths.slice(0, index + 1).join('/');
            const isLast = index === breadcrumbs.length - 1;
            return (
               <span key={index}>
                  {index > 0 && <span className="mx-1 text-[#000000]"> / </span>}
                  {isLast ? (
                     <span className="text-black font-semibold">{item.label}</span>
                  ) : (
                     <Link to={item.path} className="text-[#000000]">
                        {item.label}
                     </Link>
                  )}
               </span>
            );
         })}
      </nav>
   );
}

export default Breadcrumb;
