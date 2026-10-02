import { Link } from 'react-router';

/** Full-page message for a missing page or an unexpected error. */
export default function StatusMessage({ notFound }: { notFound: boolean }) {
  return (
    <section className="status-page">
      <div className="container container-narrow center">
        <p className="eyebrow">{notFound ? '404' : 'Something went wrong'}</p>
        <h1>{notFound ? 'We couldn’t find that page.' : 'We hit an unexpected problem.'}</h1>
        <p className="lead">
          {notFound
            ? 'It may have moved or changed.'
            : 'Try again, or contact us if the problem continues.'}
        </p>
        <div className="btn-row">
          <Link to="/" className="btn">
            Return home
          </Link>
          {notFound && (
            <Link to="/initiatives" className="btn btn--secondary">
              Explore our initiatives
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
