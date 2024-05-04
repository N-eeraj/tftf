const LoadingAnimation = ({ className }) => {
  return (
    <div className={`flex gap-x-2 ${className}`}>
      {
        Array.from({ length: 3 }).map((_, index) => <div className='w-2 aspect-square bg-white rounded-full animate-bounce' style={{ animationDelay: `${250 * index}ms` }} key={index} />)
      }
    </div>
  )
}

export default LoadingAnimation
