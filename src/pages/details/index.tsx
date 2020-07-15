import * as React from "react";
import HeaderBar from "../../components/HeaderBar";
import "./details.scss";
import StarRating from "./components/StarRating";

export interface DetailsProps {
  id: number;
  title: string;
  description: string;
  rating: number;
  popularity: number;
  language: string;
  prod_companies?: Array<object>;
  src: string;
  name: string;
}

class DetailsPage extends React.Component<any, DetailsProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      title: this.props.location.state.title,
      description: this.props.location.state.description,
      rating: this.props.location.state.rating,
      popularity: this.props.location.state.popularity,
      language: this.props.location.state.language,
      prod_companies: this.props.location.state.prod_companies,
      src: this.props.location.state.src,
      name: this.props.location.state.name,
    };
  }
  render() {
    const {
      id,
      title,
      description,
      rating,
      popularity,
      language,
      prod_companies,
      src,
      name,
    } = this.state;

    return (
      <div className="layout">
        <div className="layout-core">
          <HeaderBar title="Movie Details" />
          <div style={{ margin: 80 }}>
            <div className="details-title">{title}</div>
            <div className="details-container">
              <div className="details-img">
                <img
                  src={src}
                  alt={name}
                  style={{ height: 400, width: 1000 }}
                />
                <div className="details-description-container">
                  <div className="details-description-text">{description}</div>
                </div>
              </div>
            </div>
            <div className="details-movie-stats">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: 45,
                }}
              >
                <p>
                  <strong>Rating: </strong>
                  {rating}
                </p>
                <StarRating movie_id={id} />
              </div>
              <p>
                <strong>Popularity: </strong>
                {popularity}
              </p>
              <p>
                <strong>Language: </strong>
                {language}
              </p>
              <div>
                <strong>Prodaction companies: </strong>
                <span>
                  {prod_companies?.map((company: any) => (
                    <span style={{ margin: 10 }}>{company.name},</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsPage;
