import Sequelize from "sequelize"

const { PGDATABASE , PGUSER , PGPASSWORD ,  PGHOST } = process.env


const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: 'postgres'
  });



export default sequelize