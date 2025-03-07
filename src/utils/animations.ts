export const safariStyles = {
  fadeInAnimation: {
    WebkitAnimation: "fadeIn 0.5s ease-out forwards",
    animation: "fadeIn 0.5s ease-out forwards",
    opacity: 0,
  },
  cardAnimation: (index: number) => ({
    ...safariStyles.fadeInAnimation,
    WebkitAnimationDelay: `${index * 0.1}s`,
    animationDelay: `${index * 0.1}s`,
    WebkitTransform: "translateZ(0)",
    transform: "translateZ(0)",
  }),
  loadingSpinner: {
    WebkitAnimation: "spin 1s linear infinite",
    animation: "spin 1s linear infinite",
  },
}; 