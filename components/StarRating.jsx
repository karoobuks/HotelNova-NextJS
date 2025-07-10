// // components/StarRating.jsx
// 'use client';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// const StarRating = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   const stars = [];

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
//   }

//   if (hasHalfStar) {
//     stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
//   }

//   for (let i = 0; i < emptyStars; i++) {
//     stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
//   }

//   return (
//     <span className="flex items-center gap-1">
//       {stars}
//       <span className="ml-1 text-sm text-gray-800">({rating})</span>
//     </span>
//   );
// };

// export default StarRating;


// components/StarRating.jsx
'use client';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Dynamic color based on rating
  let color = 'text-yellow-500';
  if (rating >= 4.5) color = 'text-green-500';
  else if (rating < 3) color = 'text-red-500';

  const starAnimation = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.05 },
    }),
  };

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <motion.span
        key={`full-${i}`}
        variants={starAnimation}
        initial="hidden"
        animate="visible"
        custom={i}
      >
        <FaStar className={color} />
      </motion.span>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <motion.span
        key="half"
        variants={starAnimation}
        initial="hidden"
        animate="visible"
        custom={fullStars}
      >
        <FaStarHalfAlt className={color} />
      </motion.span>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <motion.span
        key={`empty-${i}`}
        variants={starAnimation}
        initial="hidden"
        animate="visible"
        custom={fullStars + (hasHalfStar ? 1 : 0) + i}
      >
        <FaRegStar className="text-gray-300" />
      </motion.span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="ml-1 text-sm text-gray-800">({rating})</span>
    </div>
  );
};

export default StarRating;
