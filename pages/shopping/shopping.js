Page({
  data: {
    searchKey: '',
    currentCategory: 'fruits',
    banners: [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ],
    products: {
      fruits: [
        { id: 1, name: '甘蔗', price: '5.8', unit: '斤' },
        { id: 2, name: '香蕉', price: '3.9', unit: '斤' },
        { id: 3, name: '菠萝', price: '6.5', unit: '个' },
        { id: 4, name: '菠萝', price: '6.5', unit: '个' },
        { id: 5, name: '菠萝', price: '6.5', unit: '个' },
        { id: 6, name: '菠萝', price: '6.5', unit: '个' }
      ],
      meat: [
        { id: 4, name: '鸡肉', price: '15.8', unit: '斤' },
        { id: 5, name: '土鸡蛋', price: '2.5', unit: '个' },
        { id: 6, name: '猪肉', price: '25.8', unit: '斤' }
      ],
      seafood: [
        { id: 7, name: '基围虾', price: '45.8', unit: '斤' },
        { id: 8, name: '草鱼', price: '12.8', unit: '斤' }
      ]
    },
    currentProducts: []
  },

  onLoad() {
    // 初始化显示果蔬类商品
    this.setData({
      currentProducts: this.data.products.fruits
    });
  },

  onSearchInput(e) {
    const searchKey = e.detail.value;
    this.setData({ searchKey });
    this.searchProducts(searchKey);
  },

  searchProducts(key) {
    if (!key) {
      // 如果搜索关键词为空，显示当前分类的所有商品
      this.switchCategory({ currentTarget: { dataset: { category: this.data.currentCategory } } });
      return;
    }

    // 在所有商品中搜索
    const allProducts = [
      ...this.data.products.fruits,
      ...this.data.products.meat,
      ...this.data.products.seafood
    ];

    const searchResult = allProducts.filter(product => 
      product.name.toLowerCase().includes(key.toLowerCase())
    );

    this.setData({
      currentProducts: searchResult
    });
  },

  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      currentProducts: this.data.products[category],
      searchKey: '' // 切换分类时清空搜索
    });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/detail?id=${id}`
    });
  }
});