# rename components/utils to components/common
# single source of truth for books in bookspage (single data source, and we derive from it!!)
# transfer responsibility to parent (BooksPage) as provided in the image description (https://files.slack.com/files-pri/T04MLLBPEMT-F059LCH05JM/image.png)
## bookList should be a dumb component. it doesn't care about filtering! it only displays a list of books. the parent should filter the books.
# add storybook and stories for each component (NOT PAGES), only for presentational components
# VARIABLE NAMES!!