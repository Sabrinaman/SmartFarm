Page({
  data: {
    currentIndex: 0,
    showClaimModal: false,
    selectedSpecies: null,
    claimForm: {
      name: '',
      quantity: ''
    },
    speciesList: [
      {
        id: 1,
        name: '香蕉',
        type: 'crop',
        image: '/images/addSpeciesIcon/banana.png',
        colorClass: 'card-banana',
        growthCycle: 270,
        difficulty: '中等',
        difficultyClass: 'medium',
        expectedYield: '25-30kg/株',
        soilType: '砂质壤土',
        climate: '温度22-28℃，湿度70-80%'
      },
      {
        id: 2,
        name: '家猪',
        type: 'animal',
        image: '/images/addSpeciesIcon/pig.png',
        colorClass: 'card-pig',
        breedingCycle: 150,
        feedRequirement: '玉米、豆粕 3kg/天',
        breedingFeatures: '每胎8-12头，每年可繁殖2胎',
        environment: '温度18-26℃，相对湿度65-75%'
      },
      {
        id: 3,
        name: '鸡',
        type: 'animal',
        image: '/images/addSpeciesIcon/ji.png',
        colorClass: 'card-chicken',
        breedingCycle: 45,
        feedRequirement: '配合饲料 120g/天',
        breedingFeatures: '45天即可出栏',
        environment: '温度20-25℃，相对湿度60-70%'
      },
      {
        id: 4,
        name: '菠萝',
        type: 'crop',
        image: '/images/addSpeciesIcon/boluox.png',
        colorClass: 'card-pineapple',
        growthCycle: 180,
        difficulty: '困难',
        difficultyClass: 'hard',
        expectedYield: '2-3kg/株',
        soilType: '砂质土壤',
        climate: '温度20-30℃，湿度60-80%'
      },
      {
        id: 5,
        name: '甘蔗',
        type: 'crop',
        image: '/images/addSpeciesIcon/ganzhe.png',
        colorClass: 'card-sugarcane',
        growthCycle: 300,
        difficulty: '简单',
        difficultyClass: 'easy',
        expectedYield: '60-80吨/公顷',
        soilType: '壤土或砂壤土',
        climate: '温度24-30℃，湿度75-85%'
      }
    ]
  },

  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  goBack() {
    wx.switchTab({
      url: '/pages/index/index',
    })
    console.log("1231232")
  },

  claimSpecies(e) {
    const id = e.currentTarget.dataset.id;
    const species = this.data.speciesList.find(item => item.id === id);
    this.setData({
      showClaimModal: true,
      selectedSpecies: species,
      claimForm: {
        name: '',
        quantity: ''
      }
    });
  },
// 输入事件处理
onNameInput(e) {
  this.setData({
    'claimForm.name': e.detail.value
  });
},

onQuantityInput(e) {
  this.setData({
    'claimForm.quantity': e.detail.value
  });
},
  // 取消认领
  cancelClaim() {
    this.setData({
      showClaimModal: false
    });
  },

  // 确认认领
  confirmClaim() {
    const { selectedSpecies, claimForm } = this.data;
    
    if (!claimForm.name.trim()) {
      wx.showToast({
        title: '请输入名称',
        icon: 'none'
      });
      return;
    }

    if (!claimForm.quantity) {
      wx.showToast({
        title: `请输入${selectedSpecies.type === 'animal' ? '数量' : '重量'}`,
        icon: 'none'
      });
      return;
    }

    // 准备新增的农场项目数据
    const newFarmItem = {
      id: Date.now(),
      name: claimForm.name,
      originalName: selectedSpecies.name,
      type: selectedSpecies.type,
      icon: selectedSpecies.image,
      quantity: claimForm.quantity,
      status: '生长良好',
      statusClass: 'status-good',
      growthProgress: 0,
      daysGrown: 0,
      daysRemaining: selectedSpecies.type === 'animal' ? 
        selectedSpecies.breedingCycle : 
        selectedSpecies.growthCycle,
      expectedYield: selectedSpecies.expectedYield,
      currentPhase: selectedSpecies.type === 'animal' ? '生长期' : '发芽期',
      careTips: '开始培育啦，请按时查看'
    };

    // 获取首页页面实例
    const pages = getCurrentPages();
    const indexPage = pages.find(page => page.route === '/pages/index/index');
    
    if (indexPage) {
      // 更新首页数据
      const claimedItems = indexPage.data.claimedItems || [];
      indexPage.setData({
        claimedItems: [...claimedItems, newFarmItem]
      });
    }

    // 显示成功提示并返回
    wx.showToast({
      title: '认领成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          this.setData({
            showClaimModal: false
          });
          wx.navigateBack({
            delta: 1
          });
        }, 2000);
      }
    });
  }
});