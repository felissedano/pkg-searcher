import { ReposData } from "../state/actions";

const RepoWidget: React.FC<ReposData> = (reposData: ReposData) => {
    return <div>
        {reposData.githubAvatarLink && <img src={reposData.githubAvatarLink} alt="avatar" />}
        <div>
            <p>{reposData.authorName}</p>
            <ul>
                <li>{reposData.repoName}</li>
                <li>{reposData.authorName}</li>
                <li>{reposData.githubLink}</li>
                <li>{reposData.githubStarredCount}</li>
            </ul>
        </div>
    </div>
}

export default RepoWidget;