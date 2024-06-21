

class UserService{

     /**
    * @description listing of user
    * @param queryString req query object
    * @params User id of user
    * @returns 
    */

    async getDashBoardData(){
        // // let totaUsers = await UserModel.countDocuments();
        // var currentDate = new Date(); // Get the current date
        //     // Calculate the date 30 days ago
        // currentDate.setDate(currentDate.getDate() - 30);
        // let activeUsers = await UserModel.countDocuments({ lastLogin: { $gte: currentDate } });
        // let searches = await SearchModel.aggregate([
        //   {
        //     $group: {
        //       _id: "$searchText",
        //       count: { $sum: 1 }
        //     }
        //   },
        //   {
        //     $sort: { count: -1 }
        //   },
        //   {
        //     $limit: 20
        //   }
        // ])
        // return {totaUsers, activeUsers,searches}
    }
}
export default new UserService();