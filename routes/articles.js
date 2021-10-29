const express = require('express');

const router = express.Router();
const Article = require('../models/Articles');

router.get('/', async (req, res) => {
    try{
        const articles = await Article.find();
        res.json(articles);
    }catch(err) {
        res.json({message: err});
    }
});

router.get('/:articleId', async (req, res) => {
   try{
    const article = await Article.findById(req.params.articleId);
    res.json(article);
   } catch(err) {
       res.json({message: err});
   }

});

router.post('/', async (req, res) => {
    const  article = new Article({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    });
    try{
        const savedArticle = await article.save();
        res.json(savedArticle);
    }catch(err) {
        res.json({message: err});
    }
    
});

router.put('/:articleId', async (req, res) => {
    try{
        const articleUpdate = await Article.updateOne({_id: req.params.articleId},
                                                {$set: {title: req.body.title,
                                                        description: req.body.description,
                                                        author: req.body.author}});
        res.json(articleUpdate);
    } catch(err) {
        res.json({message: err});
    }
});

router.delete('/:articleId', async (req, res) => {
   try{
    const articleRemove = await Article.deleteOne({_id: req.params.articleId });
    res.json(articleRemove);
   } catch(err) {
       res.json({message: err});
   }
});

module.exports = router;