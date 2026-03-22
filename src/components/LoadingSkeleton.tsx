export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-blue-500 to-blue-600 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 max-w-2xl">
        {/* Header Skeleton */}
        <div className="text-white text-center mb-8 sm:mb-12">
          <div className="flex justify-between items-start mb-8 sm:mb-10">
            <div className="h-7 w-48 bg-white/20 rounded-xl"></div>
            <div className="h-9 w-16 bg-white/20 rounded-full"></div>
          </div>

          {/* Temperature Hero Skeleton */}
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <div className="h-20 w-48 bg-white/20 rounded-2xl mx-auto mb-2 sm:mb-3"></div>
            <div className="h-7 w-32 bg-white/20 rounded-xl mx-auto mb-2 sm:mb-3"></div>
            <div className="h-6 w-40 bg-white/20 rounded-xl mx-auto"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-md mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                <div className="h-3 w-16 bg-white/20 rounded mb-2 mx-auto"></div>
                <div className="h-6 w-12 bg-white/20 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="h-6 w-20 bg-white/30 rounded-xl mb-3 sm:mb-4"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
            <div className="flex gap-3 sm:gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-shrink-0 p-3 sm:p-4 text-center min-w-[72px] sm:min-w-[80px]">
                  <div className="h-4 w-12 bg-white/20 rounded mb-2 mx-auto"></div>
                  <div className="w-8 h-8 bg-white/20 rounded-full mb-2 mx-auto"></div>
                  <div className="h-5 w-10 bg-white/20 rounded mb-1.5 mx-auto"></div>
                  <div className="h-3 w-8 bg-white/20 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="h-6 w-20 bg-white/30 rounded-xl mb-3 sm:mb-4"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2 sm:p-3 text-center">
                  <div className="h-3 w-16 bg-white/20 rounded mb-2 mx-auto"></div>
                  <div className="h-6 w-12 bg-white/20 rounded mb-1 mx-auto"></div>
                  <div className="h-3 w-10 bg-white/20 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Forecast Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="h-6 w-32 bg-white/30 rounded-xl mb-3 sm:mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="h-4 w-12 bg-white/20 rounded"></div>
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                  <div className="h-3 w-20 bg-white/20 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-white/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
