if exists (SELECT * from dbo.sysobjects WHERE id=object_id(N'[dbo].[AddCustomerToDatabase]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
DROP PROCEDURE [dbo].[AddCustomerToDatabase]
GO

CREATE PROCEDURE [dbo].[AddCustomerToDatabase]
(
	@Name [nvarchar](255) = Null
	,@Email [nvarchar](255) = Null
	,@PhoneNumber [nvarchar](255) = Null
	,@PhoneType [nvarchar](255) = Null
)
As
	INSERT INTO Customers
	VALUES (@Name, @Email, @PhoneNumber, @PhoneType);
GO

GRANT EXECUTE ON [dbo].[AddCustomerToDatabase] TO [public]
GO