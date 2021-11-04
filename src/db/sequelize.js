import Sequelize from "sequelize"

const { PGDATABASE , PGUSER , PGPASSWORD ,  PGHOST , PGPORT} = process.env


const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres'
});



//this function sync sequelize with the database
export const connectDB = async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.log(error);
    }
};



export default sequelize