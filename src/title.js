import lib from './lib';

let title = {
    update: function() {
    },

    render: function() {
        const logoWidth = 192;
        lib.drawSubImageRect((lib.width - logoWidth) / 2, 8, logoWidth, 40, 0, 160);
    }
};

export default title;