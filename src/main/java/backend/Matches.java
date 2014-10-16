package backend;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import jpa.Hero;
import jpa.Mission;

import objects.Match;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

@PersistenceContext(name = "MySQL")
@Transactional
@Path("matches")
public class Matches {

	private static final String encoding = "UTF-8";

	@PersistenceContext
	EntityManager em;

	private static ObjectMapper mapper = new ObjectMapper();

	@GET
	@Produces("application/json;charset=" + encoding)
	public String getMatches(@QueryParam("heroId") Long heroId,
			@QueryParam("missionId") Long missionId)
			throws JsonGenerationException, JsonMappingException, IOException {
		if (heroId != null) {
			final TypedQuery<Mission> q1 = em.createQuery(
					"SELECT x FROM Mission x", Mission.class);
			return mapper.writeValueAsString(createMatchingMissionsForHero(
					heroId, q1.getResultList()));
		} else if (missionId != null) {
			final TypedQuery<Hero> q1 = em.createQuery("SELECT x FROM Hero x",
					Hero.class);
			return mapper.writeValueAsString(createMatchingHeroesForMission(
					missionId, q1.getResultList()));
		} else {
			throw new RuntimeException(
					"At least one parameter 'hero' or 'mission' is required!");
		}
	}

	private List<Match> createMatchingHeroesForMission(Long missionId,
			final List<Hero> heroes) {
		final List<Match> matches = new ArrayList<Match>();
		for (Hero hero : heroes) {
			matches.add(new Match(100, missionId, hero.getId()));
		}
		return matches;
	}

	private List<Match> createMatchingMissionsForHero(Long heroId,
			final List<Mission> missions) {
		final List<Match> matches = new ArrayList<Match>();
		for (Mission mission : missions) {
			matches.add(new Match(100, mission.getId(), heroId));
		}
		return matches;
	}

}
