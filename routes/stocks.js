const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Stock = require('../models/stock');

//To get all stock details
router.get('/',(req,res,next)=>{

Stock.getAllStocks((err,stocks)=>{

      if(err)throw err;
        if(stocks){
            return res.json({success:true,stockList:stocks});
        }else{
            return res.json({success:false,msg:"There is no stock added yet. Database is empty"});
          }
  });

});

//To get stock details by stock id
router.get('/:searchStockID',(req,res,next)=>{
  let searchStockID=req.params.searchStockID;
Stock.getStockById(searchStockID,(err,stocks)=>{

      if(err)throw err;
        if(stocks){
            return res.json({success:true,stockList:stocks});
        }else{
            return res.json({success:false,msg:"There is no stock"});
          }
  });

});
//To add stock details
router.post('/',(req,res,next)=>{
  let DrugID = req.body.DrugId;
  let TotalQuantity = req.body.TotalQuantity;
  let StockLevel = req.body.StockLevel;

let newStock=new Stock({
DrugID:DrugID,
TotalQuantity:TotalQuantity,
StockLevel:StockLevel
//StockName:StockName,

});
 
   
      Stock.addStock(newStock,(err, stock)=>{
        if(err){

          res.json({success:false, msg:"Failed to add stock " ,err : err});

        } else {

          res.json({success:true, msg:"Successfully added a stock to the database!!!"});

        }

      });

  
});

//Upadte stock details
router.put('/:id',(req,res,next)=>{
  let stockId=req.params.id;
    Stock.getStockById(stockId,(err,stock) =>{
      stock.TotalQuantity=req.body.TotalQuantity;
      stock.StockLevel=req.body.StockLevel;
      // stock.DrugID=req.body.DrugID;
        Stock.update(stock,(err,newStock)=>{
          if(!err){
            res.json({success:true, msg:"Stock is Successfully updated"});
          } else {
            res.json({success:false, msg:"Stock is not updated" , err : err});
          }

        });
          });

});

//To delete stock details by stock id
router.delete('/:stockId',(req,res,next)=>{
let stockId=req.params.stockId;
Stock.deleteStock(stockId,(err,stock)=>{
  if(err)throw err;
  if(stock){
      return res.json({success:true,msg:"Stock details deleted."})
  }
  else{
    return res.json({success:false,msg:"Stock data record not deleted"});
  }
});

});
module.exports = router;
