import { ReposData } from "../state/actions";
import "./RepoWidget.css"

const RepoWidget: React.FC<ReposData> = (reposData: ReposData) => {
    return <div className="container__repowidget">
        {reposData.githubAvatarLink && <img className="image__avatar" src={reposData.githubAvatarLink} alt="avatar" />}
        <div className="container__repoinfo--main">
            
            <h3>{reposData.repoName}</h3>
        </div>
        <div className="container__repoinfo--extra">
            {/* <p>{reposData.authorName}</p> */}
            <ul className="list__repoinfo">
                <li>Author: {reposData.authorName}</li>
                <li>GitHub Starred Count : {reposData.githubStarredCount}</li>
                <li> <a href={reposData.githubLink} target="_blank" rel="noreferrer">{reposData.githubLink}</a> </li>
            </ul>
        </div>
    </div>
}

export default RepoWidget;