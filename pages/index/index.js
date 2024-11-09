Page({
  data: {
    currentIndex: 0,
    showClaimModal: false,
    claimedItems: [
      {
        id: 1,
        type: 'crop',
        name: '菠萝',
        icon: '/images/crops/pineapple.png',
        temperature: 25,
        temperatureClass: 'warm',
        weatherIcon: '/images/weather/sunny.png',
        growthProgress:'100',
        weatherDesc: '晴，微风',
        showDetail: false,
        growthCycle: 180,
        difficulty: '中等',
        expectedYield: '15-20kg',
        soilType: '砂质土壤',
        climate: '温度20-30℃，湿度60-80%',
        currentPhase: '生长良好',
        daysGrown: '30',
        daysRemaining: '243'
      }
      // 其他已认领项目...
    ],
    availableSpecies: [
      {
        id: 'sp1',
        name: '香蕉',
        icon: '/images/crops/banana.png',
        type: 'crop'
      },
      {
        id: 'sp2',
        name: '种猪',
        icon: '/images/animals/pig.png',
        type: 'animal'
      }
      // 更多可认领物种...
    ]
  },

  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  toggleDetail(e) {
    const id = e.currentTarget.dataset.id;
    const claimedItems = this.data.claimedItems.map(item => {
      if (item.id === id) {
        return { ...item, showDetail: !item.showDetail };
      }
      return item;
    });
    this.setData({ claimedItems });
  },

  addNewSpecies() {
    wx.navigateTo({
      url: '/pages/addSpecies/addSpecies',
    })
  },

  hideClaimModal() {
    this.setData({ showClaimModal: false });
  },

  claimSpecies(e) {
    const speciesId = e.currentTarget.dataset.id;
    const species = this.data.availableSpecies.find(item => item.id === speciesId);
    
    // 这里添加认领逻辑，例如调用API
    console.log('认领物种:', species);
    
    // 模拟认领成功
    const newClaimedItem = {
      id: Date.now(),
      ...species,
      temperature: 25,
      temperatureClass: 'warm',
      weatherIcon: '/images/weather/sunny.png',
      weatherDesc: '晴，微风',
      showDetail: false
    };

    this.setData({
      claimedItems: [...this.data.claimedItems, newClaimedItem],
      showClaimModal: false
    });
  },

  // 根据温度返回对应的样式类
  getTemperatureClass(temp) {
    if (temp >= 30) return 'hot';
    if (temp >= 20) return 'warm';
    if (temp >= 10) return 'cool';
    return 'cold';
  }
});