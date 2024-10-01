import { connection } from '../DB/index.js';
import { dataObj, failureObj } from '../trait/api-traits.js';


export const list_subcategory = async (req, res) => {
    try {
        const subcategories = await connection.query(
            'SELECT * FROM subcategories'
        );
        return res.status(200).json(
            dataObj(
                200, subcategories.rows, "subcategories fetched succssfully"
            )
        );
    } catch (error) {
        console.error('Server while fetching subcategories:', error);
        return res.status(500).json(
            failureObj(500, error, "Server error happened")
        );
    }
};

export const add_category = async (req, res) => {
    const name = req.body.name;
    if (!name)
        return res.status(400)
            .json({ msg: "Please enter a name for category" })
    try {
        await connection.query(
            'INSERT INTO categories (name) VALUES ($1)', [name]);
        return res.status(200)
            .json({ msg: "Category added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({
                msg: "Error happened while adding\
                          category, please try again later"
            });
    }
}

export const add_subcategory = async (req, res) => {
    const name = req.body.name;
    const category = req.body.category;

    if (!name && !category)
        return res.status(400)
            .json({ msg: "Please enter a valid information for subcategory" });
    try {
        await connection.query(
            'INSERT INTO subcategories (name, category) VALUES ($1, $2)', [name]);
        return res.status(200)
            .json({ msg: "Subcategory added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({
                msg: "Error happened while adding\
                          subcategory, please try again later"
            });
    }
};
