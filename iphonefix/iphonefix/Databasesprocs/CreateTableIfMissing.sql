/*This query checks if the table exists. If it doesn't, it creates it. */
/* TODO: find some way of making this run every startup */

IF (NOT( EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Customers')))
BEGIN
	CREATE TABLE Customers
	(
		Name nvarchar(255),
		Email nvarchar (255),
		PhoneNumber nvarchar(255),
		PhoneType nvarchar(255)
	)
END
