import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcl2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkupButton(btn, curPage) {
    return `
    <button data-goto="${
      btn === 'next' ? curPage + 1 : curPage - 1
    }" class="btn--inline pagination__btn--${btn}">
      <span>Page ${btn === 'next' ? curPage + 1 : curPage - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${
      btn === 'next' ? 'right' : 'left'
    }"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //   Page 1, and there are other pages:
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
      // `
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;
    }
    //   Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
      // `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${curPage - 1}</span>
      //   </button>
      // `;
    }

    //   Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        'prev',
        curPage
      )} ${this._generateMarkupButton('next', curPage)}`;

      //   `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${curPage - 1}</span>
      //   </button>
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;
    }

    //   Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
