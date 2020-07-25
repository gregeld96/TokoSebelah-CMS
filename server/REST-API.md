**E-Commerce CMS App**
----
> E-Commerce CMS

* **URL**

  >To Login into the app <br />
  `/login`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "token": [string],
      "msg": "User successfully logined!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "email and password required for login"
      }
    ```
    OR
    ```json
      {
        "msg": "Username or Password Invalid"
      }
    ```

<br />

* **URL**

  > To get all product list <br />
  `/products`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
        {
            "id": 2,
            "name": "Laptop Lenovo",
            "image_url": "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            "price": 5000000,
            "stock": 25,
            "categoryId": 1,
            "createdAt": "2020-07-22T03:57:13.605Z",
            "updatedAt": "2020-07-22T03:57:13.605Z"
        }
    ]
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To add a product <br />
  `/products/add`

* **Method:**

  `POST`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
    `name: string,` <br>
    `image_url: string,` <br>
    `price: integer,` <br>
    `stock: integer,` <br>
    `categoryId: integer,`

* **Success Response:**
  
  **Code:** 201 Created <br />
  **Content:** 
    ```json
    {
        "data": {
            "id": 3,
            "name": "Laptop TUF Gaming",
            "price": 5000000,
            "stock": 25,
            "image_url": "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            "categoryId": 1,
            "updatedAt": "2020-07-22T03:59:26.955Z",
            "createdAt": "2020-07-22T03:59:26.955Z"
        },
        "msg": "Laptop TUF Gaming successfully added!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Must be in positive number and more than 0,Name cannot be empty,Image cannot be empty,Image must be url,Price must in number,Price cannot be empty,Category cannot be empty"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To update the specific product <br />
  `/products/:id`

* **Method:**

  `PUT`

*  **URL Params** 

   **Required:**
 
   `id = integer`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
  ```

* **Data Params**

  **Required:**
 
    `name: string,` <br>
    `image_url: string,` <br>
    `price: integer,` <br>
    `stock: integer,` <br>
    `categoryId: integer,`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
    "product": {
        "id": "2",
        "name": "Laptop ASUS",
        "price": "5000000",
        "stock": "5",
        "image_url": "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
        "categoryId": 1
    },
    "msg": "Product edited!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Must be in positive number and more than 0,Name cannot be empty,Image cannot be empty,Image must be url,Price must in number,Price cannot be empty,Category cannot be empty"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

    OR

  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

    OR
  
  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```

    OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To delete the specific product <br />
  `/products/:id`

* **Method:**

  `DELETE`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
      "Product deleted"
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
    
  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

  OR

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```
  
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To get all the category <br />
  `/categories`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
   [
        {
          "id": [integer],
          "name": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
    ]

    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To add a category <br />
  `/categories/add`

* **Method:**

  `POST`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
   `name = [string]`

* **Success Response:**
  
  **Code:** 201 Created <br />
  **Content:** 
    ```json
    {
      "data": [
        {
          "id": [integer],
          "name": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Name cannot be empty"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To delete the specific category <br />
  `/categories/:id`

* **Method:**

  `DELETE`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
      "Category deleted!"
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
    
  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

  OR

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```
  
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To get specific category <br />
  `/categories/:name`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
   `name = [string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
   {
        "data": {
        "id": 1,
        "name": "Electronics",
        "createdAt": "2020-07-22T03:48:58.002Z",
        "updatedAt": "2020-07-22T03:48:58.002Z",
        "Products": [
            {
                "id": 2,
                "name": "Laptop Lenovo",
                "image_url": "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
                "price": 5000000,
                "stock": 25,
                "categoryId": 1,
                "createdAt": "2020-07-22T03:57:13.605Z",
                "updatedAt": "2020-07-22T03:57:13.605Z"
            },
            {
                "id": 3,
                "name": "Laptop TUF Gaming",
                "image_url": "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
                "price": 5000000,
                "stock": 25,
                "categoryId": 1,
                "createdAt": "2020-07-22T03:59:26.955Z",
                "updatedAt": "2020-07-22T03:59:26.955Z"
            }
        ]
        }
    }

    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```
    
    OR

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`