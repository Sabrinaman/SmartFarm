// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    farmItems: [
      {
        id: 1,
        name: '菠萝',
        icon: '/images/pineapple.png',
        claimed: false
      },
      {
        id: 2,
        name: '香蕉',
        icon: '/images/banana.png',
        claimed: true,
        temperature: 25,
        weatherIcon: '/images/sunny.png'
      }
      // 更多农场项目...
    ]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})