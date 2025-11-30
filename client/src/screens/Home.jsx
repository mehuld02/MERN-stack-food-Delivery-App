import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]); 
  const [foodItems, setFoodItems] = useState([]); 

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItems(response.foodItems); 
    setFoodCat(response.foodCategory); 
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src="/burger.jpg"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="Delicious burger"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="/pastry.jpg"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="Tasty pastry"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="/pizza.jpg"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="Savory pizza"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row">
                  {foodItems.length !== 0 ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3 mb-4"
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}

                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No Items Available</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No Categories Available</div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
