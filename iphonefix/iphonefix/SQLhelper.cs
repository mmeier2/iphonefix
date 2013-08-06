using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace iphonefix
{
	public class SQLhelper
	{
		private static readonly byte[] keyb =
		{
			121,	143,	42,	214,	218,
			189,	10,	62,	54,	16,
			98,	3,	33,	248,	154,
			15,	100,	28,	42,	87,
			175,	167,	143,	187,	146,
			14,	121,	152,	29,	97,
			31,	162
		};
		private static readonly byte[] ivb =
		{
			44,	235,	89,	234,	195,
			157,	243,	16,	168,	117,
			49,	104,	15,	139,	160,
			71
		};

		public static string Encrypt(string plainText)
		{

			byte[] encodedBytes;
			using (RijndaelManaged rv = new RijndaelManaged())
			{
				using (MemoryStream memoryStream = new MemoryStream(plainText.Length + 0x100))
				{
					using (ICryptoTransform encryptor = rv.CreateEncryptor(keyb, ivb))
					{
						using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
						{
							byte[] p = Encoding.UTF8.GetBytes(plainText);
							cryptoStream.Write(p, 0, p.Length);
							cryptoStream.FlushFinalBlock();
							encodedBytes = memoryStream.ToArray();
						}
					}
				}
			}
			return Convert.ToBase64String(encodedBytes);
		}

		public static string Decrypt(string cipherText)
		{


			if (string.IsNullOrEmpty(cipherText))
				return string.Empty;

			byte[] encodedBytes = Convert.FromBase64String(cipherText);
			byte[] initialText = new byte[encodedBytes.Length];

			using (RijndaelManaged rv = new RijndaelManaged())
			{
				using (MemoryStream memoryStream = new MemoryStream(encodedBytes))
				{
					using (ICryptoTransform decryptor = rv.CreateDecryptor(keyb, ivb))
					{
						using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
						{
							cryptoStream.Read(initialText, 0, initialText.Length);
						}
					}
				}
			}

			// get string from bytes, and remove extra \0
			string decrypted = Encoding.UTF8.GetString(initialText);
			if (decrypted.Length > 0)
				decrypted = decrypted.Replace("\0", string.Empty);
			return decrypted;
		}

		private static SqlConnection ConnectToDatabase()
		{
			//MUST ENCRYPT THIS INFOMRATION!!!!!!!!!!!

			return new SqlConnection("user id=" + Decrypt(ConfigurationManager.AppSettings["user"]) + ";" +
														   "password =" + Decrypt(ConfigurationManager.AppSettings["password"]) + "; server = " + Decrypt(ConfigurationManager.AppSettings["server"]) + ";" +
															"database=" + Decrypt(ConfigurationManager.AppSettings["database"]) + ";");

		}
	}
}