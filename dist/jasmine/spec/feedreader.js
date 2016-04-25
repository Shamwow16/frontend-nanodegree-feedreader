/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined and are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });

        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined and all names are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    describe('The menu', function() {
        var element;
        /* This test ensures the menu element is
         * hidden by default. It sees if the body element has the menu-hidden class active on it.
         */
        beforeEach(function() {
            element = $('body');
        });

        it('should be hidden by default', function() {
            expect(element.hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. Using the trigger function on the menu icon, it checks to
         * see if the menu-hidden class is active or inactive on the body.
         */

        var menuIcon = $('.menu-icon-link');



        it('should display when menu icon is first clicked', function() {
            menuIcon.trigger("click");
            expect(element.hasClass("menu-hidden")).toBeFalsy();
            menuIcon.trigger("click");

        });


        it('should hide when menu icon is clicked again', function() {
            menuIcon.trigger("click");
            menuIcon.trigger("click");
            expect(element.hasClass("menu-hidden")).toBeTruthy();

        });

    });


    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. This test stores the entries for a particular feed
         * in entryArray. Then, we check to see if the entryArray length is not 0 (i.e there is at least one element in it)
         *
         */
        var testFeedID = 0,
             feedContainer = $('.feed'),
            entryArray = [];
        beforeEach(function(done) {
            loadFeed(testFeedID, function() {
                done();
            });
        });

        it('has at least one .entry element within the .feed container', function() {
            entryArray = $('.entry');
            expect(entryArray.length).not.toBe(0);
        });

    });

    describe('New Feed Selection', function() {
        /*  This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed is called twice with different feed sources. The contents of the feed
         * container are compared between the two feed loads.
         */
        var initialFeedContents,
            newFeedContents;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeedContents = $('.feed').html();
                 loadFeed(1, function() {
                newFeedContents = $('.feed').html();
                done();
            });
            });
        });

        it('changes content when a new feed is loaded', function() {
            expect(initialFeedContents).not.toEqual(newFeedContents);
        });

        afterAll(function() {
            loadFeed(0);
        });
    });

/*The test below makes sure that the current feed filters out articles based on the search box.*/
    describe('The Current Feed', function() {
        var searchBox = $('.search');
        var word;
        var titleArray;
        var counter;
        var titles;
        var newTitles;
        beforeEach(function(done) {
            loadFeed(0, function() {
                titles = $('.title');
                titles.splice((titles.length) - 1, 1);
                counter = 0;
                word = titles.html().substr(0, titles.html().indexOf(' '));

                for (var i = 0; i < titles.length - 1; i++) {
                    var titleText = titles[i].innerHTML;
                    if (titleText.indexOf(word) == -1) {
                        counter++;
                    }
                }
                searchBox.val(word);
                done();
            });
        });

        it('filters out articles based on the search box', function() {
            searchBox.trigger('change');
            newTitles = $('.title:visible');
            newTitles.splice((newTitles.length) - 1, 1);
            expect(newTitles.length).not.toBe(titles.length);

        });

        afterEach(function() {
            searchBox.val('');
            searchBox.trigger('change');
        });


    });

}());
