package github

import (
	"context"
	"time"
	"github.com/CamPlume1/khoury-classroom/internal/models"
	"github.com/google/go-github/github"
)

type GitHubAppClient interface { // All methods in the APP client
	GitHubBaseClient

	GetWebhookSecret() string

	// Get the installations of the github app
	ListInstallations(ctx context.Context) ([]*github.Installation, error)

	GetFileTree(owner string, repo string) ([]models.FileTreeNode, error)
	GetFileBlob(owner string, repo string, sha string) ([]byte, error)

	// Create a new team in an organization
	CreateTeam(ctx context.Context, orgName, teamName string, description *string, maintainers []string) (*github.Team, error)

	// Add a user to a team
	AddTeamMember(ctx context.Context, teamID int64, userName string, opt *github.TeamAddTeamMembershipOptions) error

	// Add a repository permission to a team
	AssignPermissionToTeam(ctx context.Context, teamID int64, ownerName string, repoName string, permission string) error

	// Add a repository permission to a user
	AssignPermissionToUser(ctx context.Context, ownerName string, repoName string, userName string, permission string) error

	CreateDeadlineEnforcement(ctx context.Context, deadline *time.Time, orgName, repoName string) error

	// Create instance of template repository
	CreateRepoFromTemplate(ctx context.Context, orgName, templateRepoName, newRepoName string) (*models.AssignmentBaseRepo, error)
}

type GitHubUserClient interface { // All methods in the OAUTH client
	GitHubBaseClient

	// Get the details of an organization
	GetOrg(ctx context.Context, orgName string) (*models.Organization, error)

	// Get the current authenticated user
	GetCurrentUser(ctx context.Context) (models.GitHubUser, error)

	// Get the organizations the authenticated user is part of
	GetUserOrgs(ctx context.Context) ([]models.Organization, error)

	// Accept an invitation to an organization
	AcceptOrgInvitation(ctx context.Context, orgName string) error

	// Get the membership of the authenticated user to an organization (404 if not a member or invited)
	GetCurrUserOrgMembership(ctx context.Context, orgName string) (*github.Membership, error)

	ForkRepository(ctx context.Context, org, owner, repo, destName string) error

	// Create Branch protections for a given repo in an org
	//CreatePushRuleset(ctx context.Context, orgName, repoName string) error
}

type GitHubBaseClient interface { //All methods in the SHARED client

	// Check the health of the API
	Ping(ctx context.Context) (string, error)

	// List the repositories in an organization
	ListRepositoriesByOrg(ctx context.Context, orgName string, itemsPerPage int, pageNum int) ([]*models.Repository, error)

	// List the commits in a repository
	ListCommits(ctx context.Context, owner string, repo string, opts *github.CommitsListOptions) ([]*github.RepositoryCommit, error)

	// Create a new branch in a repository
	CreateBranch(ctx context.Context, owner, repo, baseBranch, newBranchName string) (*github.Reference, error)

	// Get the details of a pull request
	GetPullRequest(ctx context.Context, owner string, repo string, pullNumber int) (*github.PullRequest, error)

	// Get the diff of a pull request
	GetPullRequestDiff(ctx context.Context, owner string, repo string, pullNumber int) (string, error)

	// Create a new pull request in a repository
	CreatePullRequest(ctx context.Context, owner string, repo string, baseBranch string, headBranch string, title string, body string) (*github.PullRequest, error)

	// Create a new pull request review
	CreatePRReview(ctx context.Context, owner string, repo string, body string, comments []models.PRReviewComment) (*github.PullRequestComment, error)

	// Get the details of a user
	GetUser(ctx context.Context, userName string) (*github.User, error)

	// Get the membership of a user to an organization (404 if not a member or invited)
	GetUserOrgMembership(ctx context.Context, orgName string, userName string) (*github.Membership, error)

	// Invite a user to an organization
	InviteUserToOrganization(ctx context.Context, orgName string, userID int64) error

	SetUserMembershipInOrg(ctx context.Context, orgName string, userName string, role string) error

	CancelOrgInvitation(ctx context.Context, orgName string, userName string) error
	// Get the details of a repository
	GetRepository(ctx context.Context, owner string, repoName string) (*github.Repository, error)

	// Updates a team's permissions within a repository
	UpdateTeamRepoPermissions(ctx context.Context, org, teamSlug, owner, repo, permission string) error

	// Remove repository from team
	RemoveRepoFromTeam(ctx context.Context, org, teamSlug, owner, repo string) error

	//Create push ruleset to protect .github folders
	CreatePushRuleset(ctx context.Context, orgName, repoName string) error

	//Create rulesets to protect corresponding branches
	CreateBranchRuleset(ctx context.Context,  orgName, repoName string) error

	//Creates PR enforcements
	CreatePREnforcement(ctx context.Context, orgName, repoName string) error
}
