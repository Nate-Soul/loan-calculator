document.querySelector("#loanForm").addEventListener("submit", function(e){
    e.preventDefault();
    //hide results
    document.getElementById("results").style.display = "none";
    //show loader
    document.getElementById("loading").classList.replace("d-none", "d-block");
    //calculate
    setTimeout(calculateResults, 2000);

});


function calculateResults(){

    //UI Variables

    const amount            = document.getElementById("loanAmt");
    const interest          = document.getElementById("interest");
    const years             = document.getElementById("repaYrs");
    const monthlyPayment    = document.getElementById("monthlyPayment");
    const totalPayment      = document.getElementById("totalPayment");
    const totalInterest     = document.getElementById("totalInterest");


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //compute monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal *x*calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value   = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value  = ((monthly * calculatedPayment) - principal).toFixed(2);

        
    //display results and hide loader
    document.getElementById("loading").classList.replace("d-block", "d-none");
    document.getElementById("results").classList.replace("d-none", "d-block");
    } else {
        showError('please check your values and try again');
        //hide loader and results
        document.getElementById("loading").classList.replace("d-block", "d-none");
        document.getElementById("results").classList.replace("d-block", "d-none");
    }


}


function showError(text){

    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading-1");

    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(text));

    card.insertBefore(errorDiv, heading);
    
    setTimeout(clearError, 2000);
}

function clearError(){
    document.querySelector(".alert").remove();
}