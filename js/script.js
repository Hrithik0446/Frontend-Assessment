const unitOptionsData = [
  { units: 1, price: 10.00, discount: "10% Off", oldPrice: 24.00 },
  { units: 2, price: 18.00, discount: "20% Off", oldPrice: 24.00 },
  { units: 3, price: 24.00, discount: "30% Off", oldPrice: 24.00 }
];

const unitOptionsContainer = document.getElementById("unit-options");
const totalPriceEl = document.querySelector(".total-price");

unitOptionsData.forEach(data => {
  const optionDiv = document.createElement("div");
  optionDiv.classList.add("unit-option");
  optionDiv.setAttribute("data-price", data.price);

  optionDiv.innerHTML = `
    <input type="radio" name="unit" />
    <div class="unit-with-discount">
      <div>
        <div class="unit">
          ${data.units} Unit <span class="discount">${data.discount}</span>
        </div>
        <div class="standard-price">Standard Price</div>
      </div>
    </div>
    <div class="unit-price">
      <div>
        <div class="discounted-price">$${data.price.toFixed(2)} USD</div>
        <div class="actual-price">$${data.oldPrice.toFixed(2)} USD</div>
      </div>
    </div>
    <div class="options">
      <table class="options-table">
        <thead>
          <tr>
            <th></th>
            <th>Size</th>
            <th>Colour</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: data.units }).map((_, i) => `
            <tr>
              <td>#${i + 1}</td>
              <td>
                <select>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              </td>
              <td>
                <select>
                  <option>Black</option>
                  <option>White</option>
                  <option>Blue</option>
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  unitOptionsContainer.appendChild(optionDiv);
});

const unitOptions = document.querySelectorAll(".unit-option");

unitOptions.forEach(option => {
  option.addEventListener("click", () => {
    unitOptions.forEach(opt => {
      opt.classList.remove("active");
      opt.querySelector(".options").classList.remove("active");
      opt.querySelector("input").checked = false;
    });

    option.classList.add("active");
    option.querySelector(".options").classList.add("active");
    option.querySelector("input").checked = true;

    const price = option.getAttribute("data-price");
    totalPriceEl.textContent = `Total : $${price} USD`;
  });
});