CREATE TABLE product_subcategory (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    subcategory_id INT REFERENCES subcategories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, subcategory_id)
);
