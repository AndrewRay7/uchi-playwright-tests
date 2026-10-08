import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = 'НАПИСАТЬ НАМ', // изменил локатор
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async getPopularArticles() {
         // Дожидаемся появления первой статьи, чтобы исчез лоадер виджета
        await this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).first().waitFor({ state: 'visible', timeout: 5000 });
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all()
    }

    async clickWriteToUs() {
        // Ищем элемент, который содержит ровно этот текст на странице
    const button = this.page.locator(`text=${WidgetPage.selector.BUTTON_WRITE_TO_US}`).first();
        // Ждем его появления
        await button.waitFor({ state: 'visible', timeout: 5000 });
        return button.click();
    }



    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}

