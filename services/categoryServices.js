const Category = require('../models/categoryModel');

const getCategoryByIdService = async (id) => {
  const category = await Category.findById(id);
  return category;
};

const getCategotiesService = async (query, projection, option) => {
  const categories = await Category.find(query, projection, option);
  return categories;
};

const setCategotiesService = async (categoryname, categorytype, categorydesc, id) => {
  const category = await Category.create({
    category_name: categoryname,
    category_type: categorytype,
    category_desc: categorydesc,
    user: id
  });
  return category;
};

const updateCategoryByIdService = async (id, categoryname, categorytype, categorydesc) => {
  const category = await Category.findByIdAndUpdate(
    id,
    {
      category_name: categoryname,
      category_type: categorytype,
      category_desc: categorydesc
    },
    {
      new: true
    }
  );
  return category;
};

const deleteCategoryService = async (dataobject) => {
  await dataobject.remove();
};

module.exports = {
  getCategoryByIdService,
  getCategotiesService,
  setCategotiesService,
  updateCategoryByIdService,
  deleteCategoryService
};
