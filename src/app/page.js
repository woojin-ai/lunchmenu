'use client'

import { useState, useEffect } from 'react'
import { menuCategories, getRandomMenu, situationalMenus, getSituationalMenu } from '@/data/menuData'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [recommendedMenu, setRecommendedMenu] = useState(null)
  const [weather, setWeather] = useState('all')
  const [weatherTemp, setWeatherTemp] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [userHistory, setUserHistory] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [sortBy, setSortBy] = useState('distance')

  // 추천 결과로 스크롤하는 함수
  const scrollToResult = () => {
    setTimeout(() => {
      const resultElement = document.getElementById('recommendation-result')
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              setUserLocation({ lat: latitude, lon: longitude })

              const response = await fetch(
                `/api/weather?lat=${latitude}&lon=${longitude}`
              )
              const data = await response.json()
              
              setWeather(data.condition)
              setWeatherTemp(data.temp)
            },
            (error) => {
              console.error('위치 정보를 가져올 수 없습니다:', error)
              setWeather('clear')
            }
          )
        }
      } catch (error) {
        console.error('날씨 정보를 가져오는데 실패했습니다:', error)
        setWeather('clear')
      }
    }

    fetchWeatherData()

    const savedHistory = localStorage.getItem('lunchHistory')
    if (savedHistory) {
      setUserHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    if (userHistory.length > 0) {
      localStorage.setItem('lunchHistory', JSON.stringify(userHistory))
    }
  }, [userHistory])

  const handleRecommend = () => {
    setIsLoading(true)
    setShowResult(false)
    setShowRestaurants(false)
    
    setTimeout(() => {
      let result
      if (selectedCategory) {
        const category = menuCategories[selectedCategory]
        const excludeMenus = userHistory.slice(-3).map(item => item.menu)
        const menus = category.menus.filter(m => !excludeMenus.includes(m.name))
        
        let availableMenus = menus
        if (weather !== 'all') {
          const weatherMenus = menus.filter(
            menu => menu.weather.includes(weather) || menu.weather.includes('all')
          )
          if (weatherMenus.length > 0) {
            availableMenus = weatherMenus
          }
        }
        
        const randomMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)]
        result = { category, menu: randomMenu }
      } else {
        result = getRandomMenu(weather, userHistory.slice(-3).map(item => item.menu))
      }
      
      setRecommendedMenu(result)
      setIsLoading(false)
      setShowResult(true)
      scrollToResult() // 추천 결과로 스크롤
      
      if (result && result.menu) {
        setUserHistory(prev => [...prev, {
          menu: result.menu.name,
          category: result.category.name,
          date: new Date().toISOString()
        }])
      }
    }, 1500)
  }

  const handleSituationalRecommend = (situationId) => {
    setIsLoading(true)
    setShowResult(false)
    setShowRestaurants(false)
    setSelectedCategory(null) // 기존 카테고리 선택 해제
    
    setTimeout(() => {
      const result = getSituationalMenu(
        situationId,
        weather,
        userHistory.slice(-3).map(item => item.menu)
      )
      
      if (result) {
        setRecommendedMenu(result)
        setIsLoading(false)
        setShowResult(true)
        scrollToResult() // 추천 결과로 스크롤
        
        setUserHistory(prev => [...prev, {
          menu: result.menu.name,
          category: result.category.name,
          date: new Date().toISOString()
        }])
      } else {
        setIsLoading(false)
        alert('해당 상황에 맞는 메뉴를 찾을 수 없습니다.')
      }
    }, 1500)
  }

  const handleFindRestaurants = async () => {
    if (!recommendedMenu || !userLocation) {
      alert('위치 정보를 가져올 수 없습니다.')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/restaurants?query=${encodeURIComponent(recommendedMenu.menu.name)}&lat=${userLocation.lat}&lon=${userLocation.lon}&sort=${sortBy}`
      )
      const data = await response.json()
      
      console.log('검색된 가게:', data.restaurants)
      
      const restaurantData = data.restaurants || []
      setRestaurants(restaurantData)
      setShowRestaurants(true)
      
      if (data.isMock) {
        alert('⚠️ 현재 테스트 모드입니다!\n실제 API 키 설정 후 진짜 가게 정보가 표시됩니다.')
      }
      setIsLoading(false)
    } catch (error) {
      console.error('가게 검색 실패:', error)
      setIsLoading(false)
      alert('가게 검색 중 오류가 발생했습니다.')
    }
  }

  const sortRestaurants = (list, sortType) => {
    const sorted = [...list]
    
    // 거리순으로만 정렬
    if (sortType === 'distance') {
      sorted.sort((a, b) => parseInt(a.distance) - parseInt(b.distance))
    }
    
    return sorted
  }

  useEffect(() => {
    if (restaurants.length > 0) {
      setRestaurants(sortRestaurants(restaurants, sortBy))
    }
  }, [sortBy])

  const getWeatherEmoji = (weatherType) => {
    const emojis = {
      hot: '☀️',
      cold: '❄️',
      rainy: '🌧️',
      cloudy: '☁️',
      clear: '🌤️'
    }
    return emojis[weatherType] || '🌤️'
  }

  const getWeatherText = (weatherType) => {
    const texts = {
      hot: '더운',
      cold: '추운',
      rainy: '비오는',
      cloudy: '흐린',
      clear: '맑은'
    }
    return texts[weatherType] || '좋은'
  }

  return (
    <div className="p-4 md:p-8">
      {/* 헤더 */}
      <header className="text-center mb-12 animate-fadeIn">
        <div className="text-6xl md:text-7xl mb-4">🍽️</div>
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mb-4">
          오늘 점심은 뭐먹을까?
        </h1>
        <p className="text-xl text-gray-600">
          {getWeatherEmoji(weather)} {weatherTemp ? `${weatherTemp}°C ` : ''}{getWeatherText(weather)} 날씨에 딱 맞는 메뉴를 추천해드려요!
        </p>
      </header>

      {/* 추천 결과 - 헤더 바로 아래 */}
      <div id="recommendation-result">
        {showResult && recommendedMenu && (
          <div className="max-w-2xl mx-auto animate-fadeIn mb-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                🎉 오늘의 추천 메뉴!
              </h3>
              {recommendedMenu.situation && (
                <div className="mb-4 inline-block bg-gradient-to-r from-secondary/20 to-teal-500/20 px-6 py-2 rounded-full">
                  <span className="text-2xl mr-2">{recommendedMenu.situation.emoji}</span>
                  <span className="text-lg font-semibold text-gray-700">{recommendedMenu.situation.name}</span>
                </div>
              )}
              <div className="text-6xl mb-6">{recommendedMenu.category.emoji}</div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
                {recommendedMenu.menu.name}
              </div>
              <div className="text-xl text-gray-600 mb-6">
                {recommendedMenu.category.name}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {recommendedMenu.menu.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-accent text-gray-800 rounded-full text-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <button 
                  onClick={handleFindRestaurants}
                  disabled={isLoading}
                  className="btn-secondary py-3 text-sm disabled:opacity-50"
                >
                  {isLoading ? '검색 중...' : '📍 근처 가게 찾기'}
                </button>
                <button 
                  onClick={handleRecommend}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition-all"
                >
                  🔄 다시 추천받기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 가게 목록 - 추천 결과 바로 아래 */}
        {showRestaurants && restaurants.length > 0 && (
          <div className="max-w-4xl mx-auto animate-fadeIn mb-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  📍 근처 {recommendedMenu?.menu.name} 맛집
                </h3>
                <button
                  onClick={() => setShowRestaurants(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* 가게 목록 - 5개만 보이고 나머지는 스크롤 */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {sortRestaurants(restaurants, sortBy).map((restaurant, index) => (
                  <div
                    key={restaurant.id || index}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-gray-800">{restaurant.name}</h4>
                      <span className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                        {parseInt(restaurant.distance)}m
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{restaurant.address}</p>
                    {restaurant.phone && (
                      <p className="text-sm text-gray-500">📞 {restaurant.phone}</p>
                    )}
                    {restaurant.category && (
                      <p className="text-xs text-gray-400 mt-2">{restaurant.category}</p>
                    )}
                    {restaurant.placeUrl && restaurant.placeUrl !== '#' && (
                      <a
                        href={restaurant.placeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary hover:underline mt-2 inline-block"
                      >
                        카카오맵에서 보기 →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 랜덤 추천 배너 */}
      <section className="max-w-4xl mx-auto mb-12">
        <div 
          className={`relative overflow-hidden rounded-3xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-gradient-to-br from-primary via-pink-500 to-orange-500 shadow-2xl scale-105'
              : 'bg-gradient-to-br from-primary/80 via-pink-400/80 to-orange-400/80 shadow-xl hover:scale-102'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute text-9xl top-5 left-5">🎲</div>
            <div className="absolute text-9xl bottom-5 right-5">🎯</div>
          </div>

          <div className="relative z-10">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">🎲</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              랜덤 메뉴 추천
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              아무거나! 오늘은 운에 맡겨볼까요?
            </p>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRecommend()
              }}
              disabled={isLoading}
              className="bg-white text-primary font-bold text-xl md:text-2xl px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  메뉴 고르는 중...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>🎯</span>
                  오늘의 메뉴 추천받기!
                </span>
              )}
            </button>

            {selectedCategory === null && (
              <p className="text-sm text-white/80 mt-4">
                ✨ 현재 랜덤 모드 선택됨
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 카테고리 선택 */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          어떤 종류의 음식이 땡기시나요?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.values(menuCategories).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`menu-card p-6 rounded-2xl text-center transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br from-secondary to-teal-500 text-white shadow-xl scale-105'
                  : 'bg-white hover:bg-gray-50 text-gray-800 shadow-md'
              }`}
            >
              <div className="text-4xl mb-2">{category.emoji}</div>
              <div className="font-bold">{category.name}</div>
              <div className="text-xs mt-1 opacity-80">{category.description}</div>
            </button>
          ))}
        </div>
        
        {selectedCategory && (
          <div className="text-center mt-8">
            <button
              onClick={handleRecommend}
              disabled={isLoading}
              className="btn-secondary text-xl px-10 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  추천 중...
                </span>
              ) : (
                `${menuCategories[selectedCategory].emoji} ${menuCategories[selectedCategory].name} 추천받기`
              )}
            </button>
          </div>
        )}
      </section>

      {/* 상황별 추천 */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          지금 어떤 상황이신가요?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(situationalMenus).map((situation) => (
            <button
              key={situation.id}
              onClick={() => handleSituationalRecommend(situation.id)}
              disabled={isLoading}
              className="bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 p-6 rounded-2xl text-center transition-all shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-4xl mb-2">{situation.emoji}</div>
              <div className="font-bold text-gray-800">{situation.name}</div>
              <div className="text-xs text-gray-500 mt-1">{situation.description}</div>
            </button>
          ))}
        </div>
      </section>



      {/* 최근 추천 히스토리 */}
      {userHistory.length > 0 && (
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            📝 최근 추천 내역
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-2">
              {userHistory.slice(-5).reverse().map((item, index) => {
                const date = new Date(item.date);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                
                return (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <span className="font-semibold text-gray-800 text-lg">{item.menu}</span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-sm text-gray-500">{item.category}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{formattedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                if (confirm('추천 히스토리를 모두 삭제하시겠습니까?')) {
                  setUserHistory([])
                  localStorage.removeItem('lunchHistory')
                }
              }}
              className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              히스토리 삭제
            </button>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="text-center mt-16 py-8 border-t border-gray-200">
        <p className="text-gray-600 mb-4">매일 고민되는 점심 메뉴, 이제 걱정 끝!</p>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
          <span className="text-lg">🌟</span>
          <span className="font-semibold">Made by WJ Co.</span>
        </div>
        <p className="text-xs text-gray-400">© 2025 WJ Co. All rights reserved.</p>
      </footer>
    </div>
  )
}
