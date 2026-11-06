import pytest

# The sid the made-up tests declare: the rule on how a test declares the sid it verifies.
SID = "s-zrsc6asgmhv8tnc"


@pytest.mark.spec("@spec s-zrsc6asgmhv8tnc")
def test_a_run_reports_a_marked_test_by_a_name_its_sid_opens(pytester):
    pytester.makepyfile(
        f"""
        import pytest

        @pytest.mark.spec("@spec {SID}")
        def test_open():
            pass
        """
    )
    result = pytester.runpytest("-p", "pytest_specsheriff", "-v")
    result.assert_outcomes(passed=1)
    result.stdout.fnmatch_lines([f"*::@spec {SID} test_open PASSED*"])


@pytest.mark.spec("@spec s-zrsc6asgmhv8tnc")
def test_the_mark_is_registered(pytester):
    pytester.makepyfile(
        f"""
        import pytest

        @pytest.mark.spec("@spec {SID}")
        def test_open():
            pass
        """
    )
    result = pytester.runpytest("-p", "pytest_specsheriff", "--strict-markers")
    result.assert_outcomes(passed=1)


@pytest.mark.spec("@spec s-zrsc6asgmhv8tnc")
def test_a_mark_without_one_sid_is_refused(pytester):
    pytester.makepyfile(
        """
        import pytest

        @pytest.mark.spec("rule 4.1")
        def test_open():
            pass
        """
    )
    result = pytester.runpytest("-p", "pytest_specsheriff")
    assert result.ret != 0
    result.stderr.fnmatch_lines(["*the spec mark needs one SpecTag*"])


@pytest.mark.spec("@spec s-zrsc6asgmhv8tnc")
def test_an_unmarked_test_keeps_its_name(pytester):
    pytester.makepyfile(
        """
        def test_plain():
            pass
        """
    )
    result = pytester.runpytest("-p", "pytest_specsheriff", "-v")
    result.stdout.fnmatch_lines(["*::test_plain PASSED*"])


@pytest.mark.spec("@spec s-zrsc6asgmhv8tnc")
def test_a_mark_holding_a_bare_sid_is_refused_naming_sheriff_reindex(pytester):
    pytester.makepyfile(
        f"""
        import pytest

        @pytest.mark.spec("{SID}")
        def test_open():
            pass
        """
    )
    result = pytester.runpytest("-p", "pytest_specsheriff")
    assert result.ret != 0
    result.stderr.fnmatch_lines([f"*bare sid {SID}*sheriff reindex*"])
