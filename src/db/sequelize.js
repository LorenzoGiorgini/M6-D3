import Sequelize from "sequelize"

const { PGDATABASE , PGUSER , PGPASSWORD ,  PGHOST , PGPORT , NODE_ENV } = process.env


const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres',
  ...(NODE_ENV === 'production' && {
    dialectOptions: {
      ssl: true, 
      rejectUnauthorized: false
    }
  })
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