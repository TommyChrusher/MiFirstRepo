CREATE TABLE productos (
    Id SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    ProductCode VARCHAR(50) UNIQUE NOT NULL,
    ProductCategory VARCHAR(100),
    ProductStock INTEGER NOT NULL CHECK (stock >= 0),
    ProductPrice DECIMAL(10,2),
    ProductSupplier VARCHAR(255),
    ProductCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimientos (
    Id SERIAL PRIMARY KEY,
    ProductName_ID INT REFERENCES productos(id) ON DELETE CASCADE,
    MoveType VARCHAR(10) CHECK (MoveType IN ('entrada', 'salida')),
    MoveQuantity INTEGER NOT NULL CHECK (cantidad > 0),
    MoveDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);