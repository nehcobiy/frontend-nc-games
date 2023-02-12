export default function Home() {
  return (
    <main>
      <section className="intro">
        Welcome to my Northcoders project, which is designed to showcase both my
        frontend and backend capabilities utilising JavaScript, React, HTML and
        CSS etc. This is a brief guide to help you navigate this app:
      </section>

      <ul className="intro-list">
        <li className="intro-listed">
          Reviews will take you to a list of all reviews in the API
        </li>
        <li className="intro-listed">
          Reviews can then be sorted as desired with the sort and order options
        </li>
        <li className="intro-listed">
          Each review is linked to its individual page with additional
          information e.g. comments
        </li>
        <li className="intro-listed">
          In each review's respective page, you are able to up/downvote the
          review and post comments
        </li>
        <li className="intro-listed">
          A list of review categories can be viewed in Categories, with each
          link taking you to a list of all reviews of the selected category
        </li>
        <li className="intro-listed">
          List of users can be viewed by clicking on the top right avatar, which
          will then allow you to switch users if desired
        </li>
      </ul>
    </main>
  );
}
