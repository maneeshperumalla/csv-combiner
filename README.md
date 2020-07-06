# csv-combiner
Node JS program that takes several CSV files as arguments and merges themin to a new CSV file.

# Steps to run the program
npm install
node app ./accessories.csv ./clothing.csv

# steps to run the test cases using the mock CSV files in the folder
npm test


Below are the two files which are included in the folder to test.

clothing.csv
email_hash	category
21d56b6a011f91f4163fcb13d416aa4e1a2c7d82115b3fd3d831241fd63	Shirts
21d56b6a011f91f4163fcb13d416aa4e1a2c7d82115b3fd3d831241fd63	Pants
166ca9b3a59edaf774d107533fba2c70ed309516376ce2693e92c777dd971c4b	Cardigans


accessories.csv
email_hash	category
176146e4ae48e70df2e628b45dccfd53405c73f951c003fb8c9c09b3207e7aab	Wallets
63d42170fa2d706101ab713de2313ad3f9a05aa0b1c875a56545cfd69f7101fe	Purses
Your script would output
