const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    createUser: async (parent, { data }, { models, req }) => {
      try {

        const token = jwt.sign({ createUser: data._id }, "tokenKey", {
          expiresIn:"24h"
        });

        if (!data) throw new Error("please input information");
        
        let createUser = await models.userModel.create(data);
        // let createUser = await models.userModel.create({
        //   ...data,
        //   role: "ADMIN"
        // });

        const Token = {
          data: createUser,
          token: token
        }
        
        console.log(Token)

        return Token;
      } catch (error) {
        console.log("createUser Error: ", error);
      }
    },

    createAdmin:async (parent , {data, where}, {models, req}) => {
        try {

          if(!data) throw Error("Please Input name and password")
          const _name = await models.userModel.find({username: data?.username})
          if(_name) throw new Error('USER_ALREADY_EXIST'); 
          console.log("this is user",_name.username)


            const token = jwt.sign({ createUser: data._id }, "tokenKey", {
              expiresIn:"24h"
            });
            
            const _createAdmin = await models.userModel.create({...data,role:"ADMIN"})
            console.log(_createAdmin)
  
            let _tokenAdmin = {
              data:_createAdmin,
              token:token
            }
  
            return _tokenAdmin;

          }




        catch (error) {
            console.log(error)
        }
    },

    deleteUser: async (parent, { where }, { models, req }, info) => {
      try {
        const id = where.id;

        const _findBookIdDelete = await models.userModel.findByIdAndDelete(id);

        return _findBookIdDelete;
      } catch (error) {
        console.log(error.response);
      }
    },
    updateUser: async (parent, { data, where }, { models, req }) => {
      try {
        if (where.id === "") {
          throw new Error("Dont have Id");
        }
        console.log("where---->", where);

        const checkDataForDelete = await models.userModel.findById(where.id);
        console.log("checkDataForDelete--->", checkDataForDelete);

        if (checkDataForDelete) {
          const updateUser = await models.userModel.findByIdAndUpdate(
            where.id,
            { ...data }
          );

          return updateUser;
        } else {
          console.log("dont have data for delete");
        }
      } catch (error) {
        console.log("error--->", error);
        throw new Error(error);
      }
    },
  },

  Query: {
    user: async (parent, { where }, { models, req }, info) => {
      try {
        return models.userModel.findById(where.id);
      } catch (err) {
        console.log(err);
      }
    },
    users: async (parent, { data, where }, { models, req }, info) => {
      try {
        // query
        const users = await models.userModel.find();
        return { data: users };
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
