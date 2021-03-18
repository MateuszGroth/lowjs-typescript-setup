const express = require('express');

const router = new express.Router();

router.get('/route', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.send('es6 syntax tests z promise');
});

export default router;
