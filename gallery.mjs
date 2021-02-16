import gallery from '/gallery-items.mjs';
//console.log(gallery);
    let refs ={
     gallery: document.querySelector(".js-gallery"),
     img : document.querySelector(".lightbox__image"),
     modalBox : document.querySelector(".js-lightbox"),
     closeModal : document.querySelector(".lightbox__button"),
     overlay : document.querySelector(".lightbox__overlay"),
    };
    let newLi = [];
    let arrForArrows =[];
    let currentImgIndex =0;
      for (let elem of gallery) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      let img = document.createElement("img");
      li.classList.add("gallery__item");
      a.classList.add("gallery__link");
      a.href = elem.original;
      img.classList.add("gallery__image");
      img.src = elem.preview;
      img.setAttribute("data-source",elem.original);
      img.alt = elem.description;
      li.append(a);
      a.append(img);
      newLi.push(li);
      arrForArrows.push(elem.original);     
    }
    refs.gallery.append(...newLi);
    let w = newLi.indexOf(gallery);
    console.log(newLi);
    console.log(arrForArrows);

    refs.gallery.addEventListener("click", openModal);
    refs.closeModal.addEventListener("click", onCloseModal);
    refs.overlay.addEventListener("click", onBackdropClick);

    function openModal(event) {
      event.preventDefault();
      if (event.target.nodeName !== "IMG") {return;}
      refs.modalBox.classList.add("is-open");
      let imageRef = event.target;
      //console.log(imageRef);
      let largeImageURL = imageRef.dataset.source;
      refs.img.src = largeImageURL;
           
    }

    function onCloseModal() {
      refs.modalBox.classList.remove("is-open");
      refs.img.src = "";
    }

    function onBackdropClick(event) {
      if (event.target === event.currentTarget) {
        onCloseModal();
      }
    }
    
    window.addEventListener("keydown", keyPress);

    function keyPress(event) {
      if (event.key === "Escape") {onCloseModal();}
      if (event.key === "ArrowLeft") {prevImage();}
      if (event.key === "ArrowRight") {nextImage();}
    }
    
    function prevImage() {
      currentImgIndex = arrForArrows.indexOf(refs.img.src);
      refs.img.src = currentImgIndex <= 0 ? arrForArrows[arrForArrows.length - 1]: arrForArrows[currentImgIndex - 1];
    }
  
    function nextImage() {
      currentImgIndex = arrForArrows.indexOf(refs.img.src);
      refs.img.src = currentImgIndex >= arrForArrows.length - 1 ? arrForArrows[0] : arrForArrows[currentImgIndex + 1];
       
    }
    
