module.exports = {
  Mutation: {
    createProduct: async (parent, { data, where }, { models, req }) => {
      try {
        if (!data.price) throw `Please enter your price`;

        let createProduct = await models.productModel.create(data);
        return createProduct;
      } catch (error) {
        console.log("create product err", error);
      }
    },
    updateProduct: async (parent, { data, where }, { models, req }, info) => {
      try {
        const _id = where.id;
        if (_id === "") {
          console.log("this id not found...!");
        }

        const _checkDataID = await models.productModel.findById(_id);

        if (_checkDataID) {
          const updateProduct = await models.productModel.findByIdAndUpdate(
            _id,
            { ...data }
          );
          return updateProduct;
        } else {
          console.log("Don't have id", error);
        }
      } catch (error) {
        console.log("Update User Error", error);
      }
    },
    deleteProduct: async (parent, { where }, { models, req }) => {
      try {
        const _id = where.id;
        console.log(_id);

        if (_id === "") {
          console.log("can't not id you want delete", error);
        } else {
          const _deleteProduct = await models.productModel.findByIdAndDelete(
            _id
          );
          console.log("success delete", _deleteProduct);
          return _deleteProduct;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    getProduct: async (parent, { where }, { models, req }) => {
      try {
        const _id = where.id;

        if (_id == "") {
          throw new Error("Can not found this id to select");
        }

        const _getData = await models.productModel.findById(_id);
        return _getData;
      } catch (error) {
        console.Error("select data", error);
      }
    },
    getAllProduct: async (parent, { data, where }, { models, req }, info) => {
      try {
        const _allProduct = await models.productModel.find(where);
        return { data: _allProduct };
      } catch (error) {
        console.log("cant select all data");
      }
    },
  },
};
